type HandlerData = {
  body?: unknown;
  status?: number;
  statusText?: string;
};

export function handleSuccess({ body, status, statusText }: HandlerData) {
  return new Response(JSON.stringify(body || 'Успешно'), {
    status: status || 200,
    statusText: statusText || 'OK'
  });
}

export function handleError({ body, status, statusText }: HandlerData) {
  return new Response(JSON.stringify(body || 'Неизвестная ошибка'), {
    status: status || 400,
    statusText: statusText || 'Fail'
  });
}
