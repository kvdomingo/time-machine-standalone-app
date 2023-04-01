import { ReactElement, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import moment from "moment";
import { useDispatch } from "../store/hooks";
import { updateApiRequestLoading, updateGlobalNotification } from "../store/timeSlice";
import { DEFAULT_DATE_FORMAT } from "../utils/constants";
import { CheckInForm, CheckInResponse, PaginatedResponse, TextLogResponse } from "./types/checkIn";

const baseURL = "/api";

const axi = axios.create({ baseURL, xsrfCookieName: "csrftoken", xsrfHeaderName: "X-CSRFToken" });

const api = {
  checkin: {
    list(
      page: number = 1,
      startDate: string = moment().format(DEFAULT_DATE_FORMAT),
      endDate?: string,
    ): Promise<AxiosResponse<PaginatedResponse<CheckInResponse[]>>> {
      const params = {
        page,
        start_date: startDate,
        end_date: endDate ?? undefined,
      };
      return axi.get("/checkin", { params });
    },
    get(id: string): Promise<AxiosResponse<CheckInResponse>> {
      return axi.get(`/checkin/${id}`);
    },
    log(
      startDate: string = moment().format(DEFAULT_DATE_FORMAT),
      endDate?: string,
    ): Promise<AxiosResponse<TextLogResponse>> {
      const params = {
        start_date: startDate,
        end_date: endDate ?? undefined,
      };
      return axi.get("/textLog", { params });
    },
    create(body: CheckInForm): Promise<AxiosResponse<CheckInResponse>> {
      return axi.post("/checkin", body);
    },
    update(id: string, body: CheckInForm): Promise<AxiosResponse<CheckInResponse>> {
      return axi.put(`/checkin/${id}`, body);
    },
    delete(id: string): Promise<AxiosResponse> {
      return axi.delete(`/checkin/${id}`);
    },
  },
  tagCache: {
    list(): Promise<AxiosResponse<string[]>> {
      return axi.get("/tag");
    },
  },
};

export default api;

export function AxiosInterceptorProvider(props: { children: ReactElement }) {
  const dispatch = useDispatch();

  useEffect(() => {
    function requestFulfilledInterceptor(config: AxiosRequestConfig) {
      dispatch(updateApiRequestLoading(true));
      return config;
    }

    function requestRejectedInterceptor(error: AxiosError) {
      return Promise.reject(error);
    }

    function responseFulfilledInterceptor(response: AxiosResponse) {
      dispatch(updateApiRequestLoading(false));
      return response;
    }

    async function responseRejectedInterceptor(error: AxiosError) {
      dispatch(updateApiRequestLoading(false));
      const { status } = error.response!;
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      } else if (status > 400) {
        dispatch(
          updateGlobalNotification({
            type: "error",
            message: "An error occurred. Please try again later.",
            visible: true,
          }),
        );
      }
      console.error(error);
      return Promise.reject(error);
    }

    const reqInterceptId = axi.interceptors.request.use(requestFulfilledInterceptor, requestRejectedInterceptor);
    const resInterceptId = axi.interceptors.response.use(responseFulfilledInterceptor, responseRejectedInterceptor);

    return () => {
      axi.interceptors.request.eject(reqInterceptId);
      axi.interceptors.response.eject(resInterceptId);
    };
  }, [dispatch]);

  return props.children;
}
