export interface AcademicPeriodDatabaseQuery {
  label: string;
}

export interface AcademicPeriodUtilType {
  year: number;
  period: number;
}

export class AcademicPeriodUtil
{
  public static convertDatabaseQueryToAcademicType(databaseQuery: Array<AcademicPeriodDatabaseQuery>): Array<AcademicPeriodUtilType>
  {
    const academicPeriods: Array<AcademicPeriod> = [];

    for (const labelObject of databaseQuery)
    {
      const [ year, period, ] = labelObject.label.split(".").map(Number);
      academicPeriods.push({ year, period, });
    }

    return academicPeriods;
  }

  public static getLastAcademicYearFromRange(range: Array<AcademicPeriodUtilType>): number
  {
    const academicYears = range.map((academicPeriod) => academicPeriod.year);
    const lastYear = Math.max(...academicYears);
    return lastYear;
  }

  public static getLastAcademicPeriodFromRange(range: Array<AcademicPeriodUtilType>): number
  {
    const lastYear = this.getLastAcademicYearFromRange(range);
    const lastAcademicPeriods = range
      .filter((academicPeriod) => academicPeriod.year === lastYear)
      .map((academicPeriod) => academicPeriod.period);
    
    const lastPeriod = Math.max(...lastAcademicPeriods);

    return lastPeriod;
  }

  public static calcNextAcademicPeriod(lastAcademicPeriod: AcademicPeriodUtilType): AcademicPeriodUtilType
  {
    const {
      year: lastYear,
      period: lastPeriod,
    } = lastAcademicPeriod;

    const nextYear   = (lastPeriod === 2) ? lastYear + 1 : lastYear;
    const nextPeriod = (lastPeriod === 2) ? 1 : 2;

    return {
      year: nextYear,
      period: nextPeriod,
    };
  }

  public static getAcademicPeriod(academicPeriod: AcademicPeriodUtilType): string
  {
    return String(academicPeriod.year) +"."+ String(academicPeriod.period);
  }

  public static getNextAcademicPeriodFromUtilTypeArray(range: Array<AcademicPeriodUtilType>): string
  {
    const lastYear   = this.getLastAcademicYearFromRange(range);
    const lastPeriod = this.getLastAcademicPeriodFromRange(range);

    const nextAcademicPeriod      = this.calcNextAcademicPeriod({ year: lastYear, period: lastPeriod, });
    const nextAcademicPeriodLabel = this.getAcademicPeriod(nextAcademicPeriod);

    return nextAcademicPeriodLabel;
  }

  public static getNextAcademicPeriodFromDatabaseQueryArray(range: Array<AcademicPeriodDatabaseQuery>): string
  {
    const newRange = AcademicPeriodUtil.convertDatabaseQueryToAcademicType(range);
    return AcademicPeriodUtil.getNextAcademicPeriodFromUtilTypeArray(newRange);
  }
}