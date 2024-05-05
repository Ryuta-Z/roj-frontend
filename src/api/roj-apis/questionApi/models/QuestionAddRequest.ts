/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudeCase } from './JudeCase';
import type { JudgeConfig } from './JudgeConfig';

export type QuestionAddRequest = {
    anwser?: string;
    content?: string;
    judgeCases?: Array<JudeCase>;
    judgeConfig?: JudgeConfig;
    tags?: Array<string>;
    title?: string;
};
