export interface Mail {
  id: string,
  subject: string,
  body: string,
  from: string,
  date: string,
  status: string,
  attachments?: string[]
}
