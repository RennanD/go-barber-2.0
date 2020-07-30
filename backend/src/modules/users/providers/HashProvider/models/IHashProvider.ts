export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(playload: string, hashed: string): Promise<boolean>;
}
