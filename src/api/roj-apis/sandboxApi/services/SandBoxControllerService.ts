/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeRequest } from '../models/JudgeRequest';
import type { JudgeResponse } from '../models/JudgeResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SandBoxControllerService {

    /**
     * hello
     * @returns string OK
     * @throws ApiError
     */
    public static helloUsingGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sandbox/sandbox/hello',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * doJudge
     * @param judgeRequest judgeRequest
     * @returns JudgeResponse OK
     * @returns any Created
     * @throws ApiError
     */
    public static doJudgeUsingPost(
judgeRequest: JudgeRequest,
): CancelablePromise<JudgeResponse | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sandbox/sandbox/judge',
            body: judgeRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
