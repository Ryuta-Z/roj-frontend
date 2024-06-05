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

    /**
     * addContestQuestion
     * @param contestId 
     * @param contestName 
     * @param questions0AcceptedNum 
     * @param questions0Anwser 
     * @param questions0Content 
     * @param questions0ContestId 
     * @param questions0ContestName 
     * @param questions0CreateTime 
     * @param questions0Id 
     * @param questions0IsDelete 
     * @param questions0IsPublic 
     * @param questions0JudgeCase 
     * @param questions0JudgeConfig 
     * @param questions0Score 
     * @param questions0SubmitNum 
     * @param questions0Tags 
     * @param questions0Title 
     * @param questions0UpdateTime 
     * @param questions0UserId 
     * @returns any OK
     * @throws ApiError
     */
    public static addContestQuestionUsingPut(
contestId?: number,
contestName?: string,
questions0AcceptedNum?: number,
questions0Anwser?: string,
questions0Content?: string,
questions0ContestId?: number,
questions0ContestName?: string,
questions0CreateTime?: string,
questions0Id?: number,
questions0IsDelete?: number,
questions0IsPublic?: number,
questions0JudgeCase?: string,
questions0JudgeConfig?: string,
questions0Score?: number,
questions0SubmitNum?: number,
questions0Tags?: string,
questions0Title?: string,
questions0UpdateTime?: string,
questions0UserId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/question/pv/put/addQuestion',
            query: {
                'contestId': contestId,
                'contestName': contestName,
                'questions[0].acceptedNum': questions0AcceptedNum,
                'questions[0].anwser': questions0Anwser,
                'questions[0].content': questions0Content,
                'questions[0].contestId': questions0ContestId,
                'questions[0].contestName': questions0ContestName,
                'questions[0].createTime': questions0CreateTime,
                'questions[0].id': questions0Id,
                'questions[0].isDelete': questions0IsDelete,
                'questions[0].isPublic': questions0IsPublic,
                'questions[0].judgeCase': questions0JudgeCase,
                'questions[0].judgeConfig': questions0JudgeConfig,
                'questions[0].score': questions0Score,
                'questions[0].submitNum': questions0SubmitNum,
                'questions[0].tags': questions0Tags,
                'questions[0].title': questions0Title,
                'questions[0].updateTime': questions0UpdateTime,
                'questions[0].userId': questions0UserId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
