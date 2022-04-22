export const getSessionKey = (ctx: any): string | undefined => {
  // Give every user their personal session storage
  // (will be shared across groups and in their private chat)
  return ctx.from?.id.toString();
};
