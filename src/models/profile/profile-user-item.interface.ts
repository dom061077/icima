import { User } from '../user';
import { ProfileItem } from './profile-item.interface';

export interface ProfileUserItem{
    user: User,
    profile: ProfileItem
}