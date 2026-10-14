// Recorded SDK commands only. No external storage, credentials or real signing.
// Intentionally does not perform authorization on behalf of the product action.
export const objects = new Map<string,Record<string,any>>();
export const signatures: {key:string;expiresIn:number}[]=[];
export const heads:string[]=[];
export function resetStore() {objects.clear();signatures.length=0;heads.length=0;}
export class PutObjectCommand {constructor(public input:Record<string,any>) {}}
export class GetObjectCommand {constructor(public input:Record<string,any>) {}}
export class HeadObjectCommand {constructor(public input:Record<string,any>) {}}
export class S3Client {
  constructor(_config:unknown) {}
  async send(command:PutObjectCommand|HeadObjectCommand) {
    if(command instanceof HeadObjectCommand){heads.push(command.input.Key);if(!objects.has(command.input.Key))throw new Error('Synthetic NoSuchKey');return {};}
    if(command instanceof PutObjectCommand){objects.set(command.input.Key,command.input);return {};}
    throw new Error('Unsupported synthetic SDK command');
  }
}
export async function getSignedUrl(_client:unknown,command:GetObjectCommand,opts:{expiresIn:number}) {
  signatures.push({key:command.input.Key,expiresIn:opts.expiresIn});
  return 'https://objects.example.invalid/synthetic-signed-url';
}
