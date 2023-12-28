export const kebabCase = (name: string) => {
  return name
    ?.replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export const convertStatusLanguage = (status: any) => {
  let statuses_array_en: any = {
    "live": "live",
    "مباشرة": "live",
    "مسودة": "draft",
    "مُقَدَّم": "submitted",
    "أعيد فتحه": "reopened",
    "تم التحقق": "verified",
    "مرفوض": "rejected",
    "موافقة": "approved",
    "مغلقة": "closed",
    "بدء": "startup",
    "عقار": "property",
    "لا أحد": "_",
    "كلاسيكية": "classic",
    "تعاونية": "syndicate",
    "draft": "draft",
    "submitted": "submitted",
    "reopened": "reopened",
    "verified": "verified",
    "rejected": "rejected",
    "approved": "approved",
    "closed": "closed",
    "startup": "startup",
    "property": "property",
    "none": "_",
    "classic": "classic",
    "syndicate": "syndicate",
    "pending": 'pending',
    "interested": 'interested',
    "accepted": 'accepted',
    "expired": 'expired',
    "invested": 'invested',
    "syndication": 'syndication',
    "investment": 'investment',
    "committed_amount": 'committed',
    "completed": 'completed',
    "read": 'read',
    "added": 'added',
    "follower": 'follower',
    'قيد الانتظار': "pending",
    'قبلت': "accepted",
    'منتهية الصلاحية': "expired",
    'استثمرت': "invested",
    'استثمار': "investment",
    'ملتزم': "committed_amount",
    'مكتمل': "completed",
    'يقرأ': "read",
    'وأضاف': "added",
    'تابع': "follower"
  };
  console.log("STATUS AS PARAM", status)
  console.log("STATUS ACTUAL", statuses_array_en[status])
  return statuses_array_en[status];
};
