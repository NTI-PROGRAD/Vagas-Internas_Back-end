import { $Enums, } from "@prisma/client";

export type DocxTableData = {
  academicPeriod: string,
  entryModality: $Enums.EntryModality,
  placesOffersWithConstraints: Array<{
    course: {
      name: string,
      academicDegree: $Enums.academicDegree,
      campus: string,
    },
    morning: number,
    morningAfternoon: number,
    afternoon: number,
    afternoonNight: number,
    night: number
  }>
}