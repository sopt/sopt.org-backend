import { Request, Response } from "express";
import sc from "../constants/statusCode";
import rm from "../constants/responseMessage";
import { success, fail } from "../constants/util";
import { mainService } from "../services";

const getProject = async (req: Request, res: Response) => {
  try {
    const data = await mainService.getLogoImages();

    if (!data) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.READ_LOGO_FAIL));
    return res.status(sc.OK).send(success(sc.OK, rm.READ_LOGO_SUCCESS, data));
  } catch (error) {
    console.log(error);
    return res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

export default {
  getProject,
};
