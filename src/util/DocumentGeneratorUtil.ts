import { writeFileSync, existsSync, mkdirSync, } from "fs";
import { $Enums, } from "@prisma/client";

import {
  Document,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  Packer,
  WidthType,
  TextRun,
  AlignmentType,
  SectionType,
} from "docx";

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

export class DocumentGeneratorUtil
{
  public static async generateDocxDocument(docxTableData: DocxTableData): Promise<string>
  {
    const title = new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "ANEXO I",
          bold: true,
          size: "11pt",
        }),
      ],
    });

    const subtitle1 = new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "VAGAS E ÁREAS DE CONHECIMENTO",
          bold: true,
          size: "11pt",
        }),
      ],
    });

    const subtitle2 = new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: DocumentGeneratorUtil.getTranslatedEntryModality(docxTableData.entryModality).toUpperCase(),
          bold: true,
          size: "11pt",
        }),
      ],
    });

    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              shading: { fill: "#BBBBBB", },
              margins: {
                top: 150,
                bottom: 150,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "TRANSFERÊNCIA INTERNA DE CURSO",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: { fill: "#BBBBBB", },
              margins: {
                top: 150,
                bottom: 150,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "TURNO",
                      bold: true,
                    }),
                  ],
                }),
              ],
              columnSpan: 6,
            }),
            new TableCell({
              shading: { fill: "#BBBBBB", },
              children: [],
            }),
          ],
        }),
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "CURSO (CAMPUS)",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "GRAU",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "M",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "M/T",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "T",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "T/N",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "N",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              shading: {
                fill: "#BBBBBB",
              },
              margins: {
                top: 75,
                bottom: 75,
                left: 75,
                right: 75,
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "Total do Curso",
                      bold: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        ...docxTableData.placesOffersWithConstraints.map((placesOffers) => {
          const placesSum = placesOffers.morning +
            placesOffers.morningAfternoon +
            placesOffers.afternoon +
            placesOffers.afternoonNight +
            placesOffers.night;

          return new TableRow({
            children: [
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                      new TextRun({
                        text: `${placesOffers.course.name} (${placesOffers.course.campus})`,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: placesOffers.course.academicDegree,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: placesOffers.morning.toString(),
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: placesOffers.morningAfternoon.toString(),
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: placesOffers.afternoon.toString(),
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: placesOffers.afternoonNight.toString(),
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: placesOffers.night.toString(),
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: {
                  top: 125,
                  bottom: 125,
                  left: 75,
                  right: 75,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        text: placesSum.toString(),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        }),
      ],
    });

    const doc = new Document({
      sections: [
        {
          children: [
            title,
            subtitle1,
            subtitle2,
            new Paragraph({}),
          ],
        },
        {
          properties: { type: SectionType.CONTINUOUS, },
          children: [ table, ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    const directory  = "src/documents";
    const filename   = DocumentGeneratorUtil.generateFilename(docxTableData);
    const pathToFile = `${directory}/${filename}`;

    if (!existsSync("src/documents")) mkdirSync("src/documents");
    writeFileSync(`src/documents/${filename}`, buffer);

    return pathToFile;
  }

  private static generateFilename(docxTableData: DocxTableData)
  {
    const date = new Date();

    const day     = date.getDate().toString().padStart(2, "0");
    const month   = date.getMonth().toString().padStart(2, "0");
    const year    = date.getFullYear().toString().padStart(4, "0");
    const hours   = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const { entryModality, academicPeriod, } = docxTableData;

    const treatedEntryModality = DocumentGeneratorUtil.getTranslatedEntryModality(entryModality)
      .toLowerCase()
      .replace(/\s/g,"-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    const treatedAcademicPeriod = academicPeriod.replace(".", "-");

    return `anexo_${treatedEntryModality}_${treatedAcademicPeriod}_${day}${month}${year}${hours}${minutes}${seconds}.docx`;
  }

  private static getTranslatedEntryModality(entryModality: $Enums.EntryModality): string
  {
    switch(entryModality)
    {
      case "DiplomaBearer"            : return "Portador de Diploma";
      case "ExternalTransfer"         : return "Transferência Externa";
      case "InternalClassTimeTransfer": return "Transferência Interna de Turno";
      case "InternalCourseTransfer"   : return "Transferência Interna de Curso";
    }
  }
}