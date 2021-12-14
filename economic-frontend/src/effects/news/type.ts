export interface INewsState {
  status: Status;
  data: INews[];
}

export interface INews {
  title: string;
  description: string;
  img: string;
  link: string;
  text: string[];
}

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';

