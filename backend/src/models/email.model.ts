export interface Email {
  Id: string;
  Region: string;
  Destination: {
    ToAddresses: string[];
  };
  Source: string;
  Subject: string;
  Body: {
    text_part: string;
    html_part: string | null;
  };
  Timestamp: string;
}
