import { Controller, Get, Render, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/app/*')
  @Render('app')
  app() {}

  @Get('/')
  @Redirect('/app/', 302)
  root() {}
}
