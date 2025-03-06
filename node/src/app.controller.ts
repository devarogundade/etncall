/* eslint-disable prettier/prettier */

import { Hex } from 'viem';
import { AppService } from './app.service';
import { Message } from './schemas/message';
import { AppResponse, Paged, Status } from './types';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/messages')
  getMessages(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('status') status?: Status,
  ): Promise<AppResponse<Paged<Message[]>>> {
    return this.appService.getMessages(page, take, status);
  }

  @Get('/messages/:messageId')
  getMessage(
    @Param('messageId') messageId: Hex,
  ): Promise<AppResponse<Message | null>> {
    return this.appService.getMessage(messageId);
  }
}
