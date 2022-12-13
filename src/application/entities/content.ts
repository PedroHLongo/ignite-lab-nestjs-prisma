export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  constructor(content: string) {
    const isContentLEnghtValid = this.validateContentLength(content);

    if (!isContentLEnghtValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
