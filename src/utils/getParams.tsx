export default function getParams({
  page,
  PAGE_SIZE,
  search,
  dateFilter,
  type,
}: ApiPayload) {
  let params = `page=${page}&size=${PAGE_SIZE}`;
  params += search ? `&search=${search}` : "";
  params += dateFilter ? dateFilter : "";
  params += type ? `&type=${type}` : "";
  return params;
}
