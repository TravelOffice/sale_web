import { Page } from './Page';
import TelegramChannel from './telegram/TelegramChannel';

export type PlatformPage = TelegramChannel | Page;
