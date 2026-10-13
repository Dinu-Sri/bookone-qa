// Recorded SDK commands only. No external storage, credentials or real signing.
// Intentionally does not perform authorization on behalf of the product action.
export const objects = new Map<string,Record<string,any>>();
export const signatures: {key:string;expiresIn:number}[]=[];
export function resetStore() {objects.clear();signatures.length=0;}
export class PutObjectCommand {constructor(public input:Record<string,any>) {}}
export class GetObjectCommand {constructor(public input:Record<string,any>) {}}
export class S3Client {
  constructor(_config:unknown) {}
  async send(command:PutObjectCommand) {objects.set(command.input.Key,command.input);return {};}
}
export async function getSignedUrl(_client:unknown,command:GetObjectCommand,opts:{expiresIn:number}) {
  signatures.push({key:command.input.Key,expiresIn:opts.expiresIn});
  return 'https://objects.example.invalid/synthetic-signed-url';
}
