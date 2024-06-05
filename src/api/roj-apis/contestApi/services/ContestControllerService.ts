/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_ContestVO_ } from "../models/BaseResponse_ContestVO_";
import type { BaseResponse_List_ContestVO_ } from "../models/BaseResponse_List_ContestVO_";
import type { BaseResponse_List_Participant_ } from "../models/BaseResponse_List_Participant_";
import type { BaseResponse_List_ParticipantVO_ } from "../models/BaseResponse_List_ParticipantVO_";
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { BaseResponse_Page_Contest_ } from "../models/BaseResponse_Page_Contest_";
import type { BaseResponse_Page_TopCoderVO_ } from "../models/BaseResponse_Page_TopCoderVO_";
import type { ContestAddRequest } from "../models/ContestAddRequest";
import type { ContestQueryRequest } from "../models/ContestQueryRequest";
import type { ContestUpdateRequest } from "../models/ContestUpdateRequest";
import type { DeleteRequest } from "../models/DeleteRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ContestControllerService {
  /**
   * addContest
   * @param contestAddRequest contestAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addContestUsingPost(
    contestAddRequest: ContestAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/contest/add",
      body: contestAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * cancelParticipate
   * @param contestId
   * @param userId
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static cancelParticipateUsingPost(
    contestId?: string,
    userId?: string
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/contest/cancelParticipate",
      query: {
        contestId: contestId,
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteContest
   * @param deleteRequest deleteRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteContestUsingPost(
    deleteRequest: DeleteRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/contest/delete",
      body: deleteRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getContestList
   * @returns BaseResponse_List_ContestVO_ OK
   * @throws ApiError
   */
  public static getContestListUsingGet(): CancelablePromise<BaseResponse_List_ContestVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/contest/get/contestList",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getParticipantList
   * @param contestId contestId
   * @returns BaseResponse_List_Participant_ OK
   * @throws ApiError
   */
  public static getParticipantListUsingGet(
    contestId?: number
  ): CancelablePromise<BaseResponse_List_Participant_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/contest/get/participantList",
      query: {
        contestId: contestId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getTopList
   * @returns BaseResponse_Page_TopCoderVO_ OK
   * @throws ApiError
   */
  public static getTopListUsingGet(): CancelablePromise<BaseResponse_Page_TopCoderVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/contest/get/toplist",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getContestVOById
   * @param id id
   * @returns BaseResponse_ContestVO_ OK
   * @throws ApiError
   */
  public static getContestVoByIdUsingGet(
    id?: string
  ): CancelablePromise<BaseResponse_ContestVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/contest/get/vo",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * joinContest
   * @param contestId
   * @param userId
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static joinContestUsingPost(
    contestId?: string,
    userId?: string
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/contest/join",
      query: {
        contestId: contestId,
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listContestByPage
   * @param contestQueryRequest contestQueryRequest
   * @returns BaseResponse_Page_Contest_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listContestByPageUsingPost(
    contestQueryRequest: ContestQueryRequest
  ): CancelablePromise<BaseResponse_Page_Contest_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/contest/list/page",
      body: contestQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listParticipantVO
   * @param contestId contestId
   * @returns BaseResponse_List_ParticipantVO_ OK
   * @throws ApiError
   */
  public static listParticipantVoUsingGet(
    contestId?: number
  ): CancelablePromise<BaseResponse_List_ParticipantVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/contest/list/vo",
      query: {
        contestId: contestId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getScore
   * @param contestId
   * @param questionId
   * @param questionName
   * @param score
   * @param userId
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static getScoreUsingPut(
    contestId?: number,
    questionId?: number,
    questionName?: string,
    score?: number,
    userId?: number
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/contest/score",
      query: {
        contestId: contestId,
        questionId: questionId,
        questionName: questionName,
        score: score,
        userId: userId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateContest
   * @param contestUpdateRequest contestUpdateRequest
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateContestUsingPost(
    contestUpdateRequest: ContestUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/contest/update",
      body: contestUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
