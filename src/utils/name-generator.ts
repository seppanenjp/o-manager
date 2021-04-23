import { femaleFirstname, maleFirstname, surname } from "nimet";

export const maleName = (): { firstName: string; lastName: string } => ({
  firstName: maleFirstname(),
  lastName: surname(),
});

export const femaleName = (): { firstName: string; lastName: string } => ({
  firstName: femaleFirstname(),
  lastName: surname(),
});
