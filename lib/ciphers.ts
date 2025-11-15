import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export function encrypt(data: any, passwd: string): string {
    const iv = randomBytes(16)
    const KEY = Buffer.from(passwd, 'hex')
    const cipher = createCipheriv('aes-256-gcm', KEY, iv)

    const text = JSON.stringify(data)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag()

    // Return: iv + authTag + encrypted data (all in hex)
    return iv.toString('hex') + authTag.toString('hex') + encrypted
}

export function decrypt(encryptedData: string, passwd: string): any {
    // Extract iv (32 chars), authTag (32 chars), and encrypted text
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex')
    const authTag = Buffer.from(encryptedData.slice(32, 64), 'hex')
    const encrypted = encryptedData.slice(64)

    const KEY = Buffer.from(passwd, 'hex')
    const decipher = createDecipheriv('aes-256-gcm', KEY, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return JSON.parse(decrypted)
}