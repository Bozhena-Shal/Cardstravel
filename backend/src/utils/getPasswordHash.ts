import crypto from 'crypto'

export const getPasswordHash = (password: string) => {
  //return crypto.createHash('sha256').update(`${env.PASSWORD_SALT}${password}`).digest('hex')
  return crypto.createHash('sha256').update(password).digest('hex')
}
