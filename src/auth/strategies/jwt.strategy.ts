import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import type { AuthJwtPayload } from '../types/auth-jwtPayload';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>;
    private readonly authService: AuthService;

    constructor(@Inject(jwtConfig.KEY) jwtConfiguration: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret!,
            ignoreExpiration: false,
        });

        this.jwtConfiguration = jwtConfiguration;
    }

    async validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    }
}
