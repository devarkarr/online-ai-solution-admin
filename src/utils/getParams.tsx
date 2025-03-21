import { InQueryPayload } from "@/store/server/inbox/interface";

export default function getParams({
  page,
  PAGE_SIZE,
  search,
  dateFilter,
  type,
}: InQueryPayload) {
  let params = `page=${page}&size=${PAGE_SIZE}`;
  params += search ? `&search=${search}` : "";
  params += dateFilter ? dateFilter : "";
  params += type ? `&type=${type}` : "";
  return params;
}
