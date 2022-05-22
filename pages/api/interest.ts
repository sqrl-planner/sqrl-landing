// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { verify } from "hcaptcha"

const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.body.email)
    return res.status(500).json({ error: "No email provided" })

  const { success } = await verify(
    process.env.H_SECRET as string,
    req.body.token
  )

  if (!success) return res.status(500).json({ error: "Invalid token" })

  const addToMailingList = mailjet
    .post("contactslist", { version: "v3" })
    .id(process.env.MJ_LIST_ID)
    .action("managecontact")
    .request({
      Properties: "object",
      Action: "addnoforce",
      Email: req.body.email,
    })
  addToMailingList
    .then((result: any) => {
      console.log(result.body)

      const sendWelcomeEmail = mailjet
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: "noreply@sqrlplanner.com",
                Name: "Sqrl Planner",
              },
              To: [
                {
                  Email: req.body.email,
                },
              ],
              TemplateID: 3952165,
              TemplateLanguage: true,
              Subject: "Thanks for your interest in Sqrl!",
              Variables: {},
            },
          ],
        })
      sendWelcomeEmail
        .then((result: any) => {
          console.log(result.body)
          return res.status(200).json({ email: req.body.email })
        })
        .catch((err: any) => {
          console.log(err)
          return res.status(500).end()
        })
    })
    .catch((err: any) => {
      console.log(err)
      return res.status(500).end()
    })
}

export default handler
