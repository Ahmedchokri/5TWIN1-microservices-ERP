export interface ContactsModel {
  profile: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  score: string;
  location: string;
  date: string;
  time: string;
  tags: Array<{}>;
  isSelected?:any;
}

export interface projectListModel {
  title?: string;
  updatedTime?: string;
  badgeText ?: string;
  badgeClass?: string;
  member: Array<{
    name?: string;
    text?: string;
    img?: string;
    variant?: string;
  }>;
  cardBorderColor:string;
}

export interface documentModel {
  id:any,
  icon:string,
  iconBackgroundClass:string,
  fileName:string,
  fileType:string,
  fileSize:string,
  updatedDate:string
}

