/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_QuestionSubmitVO_ } from '../models/BaseResponse_List_QuestionSubmitVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_QuestionSubmitVO_ } from '../models/BaseResponse_Page_QuestionSubmitVO_';
import type { BaseResponse_UserPageVO_ } from '../models/BaseResponse_UserPageVO_';
import type { QuestionSubmitAddRequest } from '../models/QuestionSubmitAddRequest';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JudgeControllerService {

    /**
     * doSubmit
     * @param questionSubmitAddRequest questionSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doSubmitUsingPost(
questionSubmitAddRequest: QuestionSubmitAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/judge/do',
            body: questionSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserPageVO
     * @returns BaseResponse_UserPageVO_ OK
     * @throws ApiError
     */
    public static getUserPageVoUsingGet(): CancelablePromise<BaseResponse_UserPageVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/judge/get/userPageVO',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listLatestAcceptedQuestionSubmit
     * @returns BaseResponse_List_QuestionSubmitVO_ OK
     * @throws ApiError
     */
    public static listLatestAcceptedQuestionSubmitUsingGet(): CancelablePromise<BaseResponse_List_QuestionSubmitVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/judge/list/latestAccepted',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listLatestSubmit
     * @returns BaseResponse_List_QuestionSubmitVO_ OK
     * @throws ApiError
     */
    public static listLatestSubmitUsingGet(): CancelablePromise<BaseResponse_List_QuestionSubmitVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/judge/list/latestSubmit',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listQuestionSubmitByPage
     * @param questionSubmitQueryRequest questionSubmitQueryRequest
     * @returns BaseResponse_Page_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitByPageUsingPost(
questionSubmitQueryRequest: QuestionSubmitQueryRequest,
): CancelablePromise<BaseResponse_Page_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/judge/list/page',
            body: questionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
