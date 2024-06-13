import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {

    responseSuccess(res: ResParams): Res {
        return {
            status: 'success',
            message: res.message ?? '',
            data: res.data ?? []
        };
    }

    responseError(res: ResParams): Res {
        return {
            status: 'error',
            message: res.message ?? '',
            data: res.data ?? []
        };
    }

}
