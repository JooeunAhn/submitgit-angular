export class Course {
  constructor(
    public id: number = null,
    public professor: any = null,
    public title: string = null,
    public content: string = null,
    public year: string = null,
    public semester: string = null,
    public attachments: any = null,
    public created_at: string = null,
    public updated_at: string = null,
    public repository_set: any = null,
    public assignment_set: any = null,
  ) { }
}
