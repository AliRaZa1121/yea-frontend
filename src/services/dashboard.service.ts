import { ApiEndPoint } from "../utilities/constant/apiEndpoints";
import { httpService } from "../utilities/helper/axiosHelper";


async function welcomeMessage() {
    const response = await httpService.get(ApiEndPoint.DASHBOARD.WELCOME_MESSAGE);
    return response;
}

export const DashboardService = {
    welcomeMessage
}

