/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Question } from '../models/Question';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionPvControllerService {

    /**
     * getQuestionById
     * @param id id
     * @returns Question OK
     * @throws ApiError
     */
    public static getQuestionByIdUsingGet(
id: number,
): CancelablePromise<Question> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/pv/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * putQuestionById
     * @param question question
     * @returns any OK
     * @throws ApiError
     */
    public static putQuestionByIdUsingPut(
question: Question,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/question/pv/put',
            body: question,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
