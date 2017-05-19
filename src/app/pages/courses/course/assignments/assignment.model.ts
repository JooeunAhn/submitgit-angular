export class Assignment {
  constructor(
    public id: number = null,
    public professor: any = null,
    public title: string = null,
    public content: string = null,
    public is_test: string = null,
    public deadline: string = null,
    public attachments: any = null,
    public test_langids: any = null,
    public test_file_name: any = null,
    public test_input: any = null,
    public test_output: any = null,
    public created_at: string = null,
    public updated_at: string = null,
    public submission_set: any = null,
  ) { }
}
