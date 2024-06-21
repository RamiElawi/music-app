import { Controller } from '@nestjs/common';
import { TrakService } from './trak.service';

@Controller('trak')
export class TrakController {
    constructor(
        private readonly trakService:TrakService
    ){}
}
