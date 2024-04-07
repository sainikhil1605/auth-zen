import { Secret } from "jsonwebtoken";

export interface IJwtConfig {
  expiresIn?: string;
  secret: Secret;
  issuer?: string;
  audience?: string;
}
