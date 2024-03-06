import bcrypt from 'bcrypt';
import tokenService from './tokenService.js';
import { UserDto } from '../dtos/userDto.js';
import { User } from '../models/userModel.js';
import ApiError from '../exceptions/apiError.js';

class UserService {
    async registration(email, password, username) {
        try {
            const candidate = await User.findOne({email});
            const sameName = await User.findOne({username});

            if (candidate) {
                throw new ApiError(400, `A user with mail address ${email} already exists`);
            }

            if (sameName) {
                throw new ApiError(400, `A user named ${username} already exists`);
            }

            const hashPassword = await bcrypt.hash(password, 3);
            const user = await User.create({email, password: hashPassword, username});
            const userDto = new UserDto(user); 
            const tokens = tokenService.generateTokens({...userDto});
            
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            
            return {...tokens, user: userDto};
        } catch (error) {
            console.error(error);
            throw new ApiError(500, 'Server error');
        }
    }

    
    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw new ApiError(400, 'User with this email address was not found');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError(400, 'Wrong password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}


export const userService = new UserService();