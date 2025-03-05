/* eslint-disable prettier/prettier */

import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppResponse, Paged, Status } from './types';
import { Message } from './schemas/message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('status') status?: Status,
  ): Promise<AppResponse<Paged<Message[]>>> {
    return this.appService.getMessages(page, take, status);
  }
}
