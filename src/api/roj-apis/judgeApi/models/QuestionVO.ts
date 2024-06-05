/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudeCase } from './JudeCase';
import type { JudgeConfig } from './JudgeConfig';

export type QuestionVO = {
    acceptedNum?: number;
    content?: string;
    contestName?: string;
    createTime?: string;
    id?: number;
    judgeCases?: Array<JudeCase>;
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tagList?: Array<string>;
    title?: string;
};
