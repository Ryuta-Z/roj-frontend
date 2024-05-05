/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudeCase } from './JudeCase';
import type { JudgeConfig } from './JudgeConfig';

export type QuestionUpdateRequest = {
    acceptedNum?: number;
    anwser?: string;
    content?: string;
    id?: number;
    judgeCases?: Array<JudeCase>;
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tags?: Array<string>;
    title?: string;
};
