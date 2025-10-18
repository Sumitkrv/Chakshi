# 🎨 Admin Panel - Visual Component Guide

## 🧭 Navigation Components

### Navbar (Top Bar)
```
┌─────────────────────────────────────────────────────────────────┐
│ [☰] [🔍 Search users, transactions, content...]  [🔔2] [👤 Admin ▾] │
└─────────────────────────────────────────────────────────────────┘
```
**Features:**
- Hamburger menu to collapse sidebar
- Global search bar (expands on focus)
- Notification bell with unread count
- Profile dropdown with logout

### Sidebar (Left Panel)
```
┌─────────────────────┐
│  🛡️ Chakshi         │
│     Admin Panel     │
├─────────────────────┤
│ OVERVIEW            │
│  📊 Dashboard       │
│  📈 Analytics       │
├─────────────────────┤
│ MANAGEMENT          │
│  👥 Users           │
│  💳 Payments        │
│  📄 Content         │
│  📚 Courses         │
├─────────────────────┤
│ COMMUNICATION       │
│  🔔 Notifications   │
├─────────────────────┤
│ SYSTEM              │
│  📊 Reports         │
│  ⚙️  Settings       │
└─────────────────────┘
```

---

## 📄 Page Layouts

### 1. Dashboard
```
┌───────────────────────────────────────────────────────────────┐
│ Admin Dashboard                                                │
│ Welcome back! Here's what's happening with your platform today│
├───────────────────────────────────────────────────────────────┤
│ [Today] [Week] [Month] [Quarter]                 [Export ⬇️]   │
├───────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │👥 Total  │ │✓ Active  │ │💰 Revenue│ │📦 New    │         │
│ │  12,453  │ │  8,234   │ │  ₹28.5L  │ │  342     │         │
│ │  +12.5%↑ │ │  +8.2%↑  │ │  +23.1%↑ │ │  +15.3%↑ │         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐  ┌────────────────┐              │
│ │ Revenue Overview        │  │ Top Courses    │              │
│ │ ▓▓▓▓▓▓▓▓▓░ Jan  ₹245K  │  │ 🥇 Contract Law│              │
│ │ ▓▓▓▓▓▓▓▓▓▓ Feb  ₹298K  │  │ 🥈 Criminal Law│              │
│ │ ▓▓▓▓▓▓▓▓▓▓ Mar  ₹335K  │  │ 🥉 Constitution│              │
│ └─────────────────────────┘  └────────────────┘              │
├───────────────────────────────────────────────────────────────┤
│ Recent Activities                                              │
│ 🎉 Rahul Sharma subscribed to Premium Plan  • 2 min ago      │
│ 📚 Priya Patel completed Contract Law       • 15 min ago     │
│ 💰 Amit Kumar made payment of ₹4,999        • 32 min ago     │
└───────────────────────────────────────────────────────────────┘
```

### 2. User Management
```
┌───────────────────────────────────────────────────────────────┐
│ User Management                                                │
│ Manage and monitor all users on the platform                  │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │ Total   │ │ Active  │ │ Premium │ │ New     │             │
│ │ 12,453  │ │ 8,234   │ │ 2,145   │ │ 342     │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
├───────────────────────────────────────────────────────────────┤
│ [🔍 Search users...] [All Roles▾] [All Status▾] [+Add] [⬇️]  │
├───────────────────────────────────────────────────────────────┤
│ User         │ Contact      │ Role      │ Status   │ Actions  │
│──────────────┼──────────────┼───────────┼──────────┼──────────│
│ RS Rahul S.  │ rahul@...    │ Advocate  │ ✓ Active │ 👁️ ✏️ 🗑️ │
│ PP Priya P.  │ priya@...    │ Student   │ ✓ Active │ 👁️ ✏️ 🗑️ │
│ AK Amit K.   │ amit@...     │ Clerk     │ ✓ Active │ 👁️ ✏️ 🗑️ │
├───────────────────────────────────────────────────────────────┤
│ Showing 1 to 5 of 12,453       [Previous] [Next]              │
└───────────────────────────────────────────────────────────────┘
```

### 3. Analytics
```
┌───────────────────────────────────────────────────────────────┐
│ Analytics Dashboard                                            │
│ Comprehensive insights into your platform performance          │
├───────────────────────────────────────────────────────────────┤
│ [Today] [Week] [Month] [Quarter] [Year]                       │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │💰Revenue│ │👥 Active│ │🎯 Conv. │ │⏱️ Avg.  │             │
│ │ ₹28.5L  │ │ 8,234   │ │ 3.24%   │ │ 24m 35s │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌──────────────────┐                │
│ │ User Growth         │  │ Traffic Sources  │                │
│ │ ▓▓▓▓▓▓░ Jan 8,234   │  │ 🔵 Organic  42%  │                │
│ │ ▓▓▓▓▓▓▓ Feb 9,456   │  │ 🟢 Direct   26%  │                │
│ │ ▓▓▓▓▓▓▓▓ Mar 10,876 │  │ 🟣 Social   18%  │                │
│ └─────────────────────┘  └──────────────────┘                │
├───────────────────────────────────────────────────────────────┤
│ Device Breakdown        │ Top Pages                           │
│ 💻 Desktop   48%        │ /student/dashboard  145,234 views   │
│ 📱 Mobile    42%        │ /advocate/cases     98,765 views    │
│ 📲 Tablet    10%        │ /courses            87,654 views    │
└───────────────────────────────────────────────────────────────┘
```

### 4. Payments
```
┌───────────────────────────────────────────────────────────────┐
│ Payment Management                                             │
│ Monitor and manage all payment transactions                    │
├───────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │ Revenue  │ │ Success  │ │ Pending  │ │ Failed   │         │
│ │ ₹28.45L  │ │ 2,456    │ │ 45       │ │ 23       │         │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
├───────────────────────────────────────────────────────────────┤
│ [🔍 Search...] [All Status▾] [Date Range] [Export ⬇️]         │
├───────────────────────────────────────────────────────────────┤
│ Transaction │ User    │ Amount │ Plan      │ Status  │ Actions│
│─────────────┼─────────┼────────┼───────────┼─────────┼────────│
│ TXN001234   │ Rahul   │ ₹4,999 │ Premium   │ ✓ Done  │ 👁️ ⋮  │
│ TXN001235   │ Priya   │ ₹999   │ Basic     │ ✓ Done  │ 👁️ ⋮  │
│ TXN001236   │ Amit    │ ₹2,499 │ Premium   │ ⏳ Pend │ 👁️ 🔄 │
└───────────────────────────────────────────────────────────────┘
```

### 5. Content Management
```
┌───────────────────────────────────────────────────────────────┐
│ Content Management                                             │
│ Manage courses, articles, videos, and documents               │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │ Total   │ │Published│ │ Drafts  │ │ Rating  │             │
│ │ 342     │ │ 289     │ │ 38      │ │ 4.7⭐   │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
├───────────────────────────────────────────────────────────────┤
│ [All Content] [Courses] [Articles] [Videos] [Documents]       │
│ [🔍 Search content...] [Filter] [+Add Content]                │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────┐             │
│ │ 📚                  │  │ 📝                  │             │
│ │ Contract Law Basics │  │ Criminal Procedure  │             │
│ │ By Dr. Kumar        │  │ By Adv. Sharma      │             │
│ │ [Course] [Published]│  │ [Article] [Published]│            │
│ │ 📊 15,234 views     │  │ 📊 8,976 views      │             │
│ │ 👥 1,234 enrolled   │  │ ⭐ 4.6 rating       │             │
│ │ [View][Edit][Delete]│  │ [View][Edit][Delete]│             │
│ └─────────────────────┘  └─────────────────────┘             │
└───────────────────────────────────────────────────────────────┘
```

### 6. Courses
```
┌───────────────────────────────────────────────────────────────┐
│ Course Management                                              │
│ Manage all courses and learning content                        │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────────────────┐  ┌─────────────────────┐             │
│ │ 📚                  │  │ ⚖️                   │             │
│ │ Contract Law        │  │ Criminal Procedure  │             │
│ │ by Dr. Rajesh Kumar │  │ by Adv. Priya       │             │
│ │                     │  │                     │             │
│ │ Enrolled: 1,234     │  │ Enrolled: 989       │             │
│ │ Rating: ⭐ 4.8      │  │ Rating: ⭐ 4.6      │             │
│ │ Duration: 12 hours  │  │ Duration: 10 hours  │             │
│ │ Revenue: ₹245K      │  │ Revenue: ₹198K      │             │
│ │                     │  │                     │             │
│ │ [Edit Course][View] │  │ [Edit Course][View] │             │
│ └─────────────────────┘  └─────────────────────┘             │
└───────────────────────────────────────────────────────────────┘
```

### 7. Notifications
```
┌───────────────────────────────────────────────────────────────┐
│ Notifications Center                                           │
│ Send and manage platform notifications                         │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────┐  ┌─────────────┐         │
│ │ Send Notification               │  │ 🔔          │         │
│ │                                 │  │ 1,234       │         │
│ │ [All Users ▾]                   │  │ Sent Today  │         │
│ │                                 │  ├─────────────┤         │
│ │ Title: ___________________      │  │ ✓           │         │
│ │                                 │  │ 89%         │         │
│ │ Message:                        │  │ Delivery    │         │
│ │ ┌─────────────────────────┐     │  └─────────────┘         │
│ │ │                         │     │                          │
│ │ └─────────────────────────┘     │                          │
│ │                                 │                          │
│ │ ☑ Push  ☐ Email  ☐ SMS         │                          │
│ │                                 │                          │
│ │ [📤 Send Notification]          │                          │
│ └─────────────────────────────────┘                          │
├───────────────────────────────────────────────────────────────┤
│ Recent Notifications                                           │
│ 🎉 New Course Release • Sent to 1,234 users • 2 hours ago    │
│ 🔧 System Maintenance • Sent to 8,234 users • 5 hours ago    │
└───────────────────────────────────────────────────────────────┘
```

### 8. Settings
```
┌───────────────────────────────────────────────────────────────┐
│ System Settings                                                │
│ Configure platform settings and preferences                    │
├───────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌──────────────────────────────────────────────┐ │
│ │ ⚙️ Gen. │ │ General Settings                             │ │
│ │ 📧 Email│ │                                              │ │
│ │ 🔔 Noti.│ │ Site Name: [Chakshi Pro____________]         │ │
│ │ 🛡️ Sec. │ │                                              │ │
│ │ 💾 Data │ │ Site Email: [admin@chakshi.com_____]         │ │
│ │ 🔑 API  │ │                                              │ │
│ │ 🔌 Intg.│ │ Site URL: [https://chakshi.com_____]         │ │
│ │ 🎨 Look │ │                                              │ │
│ └─────────┘ │ Maintenance Mode        [Toggle ○──]         │ │
│             │ Allow Registration      [Toggle ──○]         │ │
│             │                                              │ │
│             │ [Reset to Defaults] [Save Changes]           │ │
│             └──────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### 9. Reports
```
┌───────────────────────────────────────────────────────────────┐
│ Reports & Analytics                                            │
│ Generate and download comprehensive reports                    │
├───────────────────────────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                              │
│ │ 342 │ │1,234│ │ 12  │ │ 89  │                              │
│ │ Gen.│ │Down.│ │Sched│ │30d  │                              │
│ └─────┘ └─────┘ └─────┘ └─────┘                              │
├───────────────────────────────────────────────────────────────┤
│ [7 Days] [30 Days] [90 Days] [1 Year] [Custom]                │
├───────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│ │ 👥           │  │ 💰           │  │ 📄           │         │
│ │ User         │  │ Revenue      │  │ Content      │         │
│ │ Analytics    │  │ Report       │  │ Performance  │         │
│ │              │  │              │  │              │         │
│ │ Last: 2h ago │  │ Last: 1d ago │  │ Last: 3h ago │         │
│ │              │  │              │  │              │         │
│ │ [📊 Gen][⬇️] │  │ [📊 Gen][⬇️] │  │ [📊 Gen][⬇️] │         │
│ └──────────────┘  └──────────────┘  └──────────────┘         │
├───────────────────────────────────────────────────────────────┤
│ Scheduled Reports                           [📅 Schedule New]  │
│ 📅 Weekly User Report    • Every Monday 9:00 AM  • Active     │
│ 📅 Monthly Revenue       • First day of month    • Active     │
└───────────────────────────────────────────────────────────────┘
```

---

## 🎨 Component Patterns

### Stat Card
```
┌─────────────────┐
│ 📊 Icon         │
│ Label      ↑5%  │
│ ──────────────  │
│ Value           │
│ 12,453          │
└─────────────────┘
```

### Table Row
```
[Avatar] Name     email@...    [Badge]    [✓ Status]    [👁️ ✏️ 🗑️]
```

### Progress Bar
```
Label: Value
▓▓▓▓▓▓▓▓▓░░░░░░ 65%
```

### Badge
```
[📚 Course]  [✓ Published]  [⏳ Pending]  [✗ Failed]
```

### Button Variants
```
[Primary Button]  - Gradient blue
[Secondary]       - White/slate
[Danger]          - Red gradient
[Icon 📥]         - Icon button
```

---

## 🎯 Color Coding

### Status Colors
- 🟢 **Green**: Success, Active, Published
- 🟡 **Yellow**: Pending, Warning, Draft
- 🔴 **Red**: Error, Failed, Inactive
- 🔵 **Blue**: Info, Primary, Links

### Role Colors
- 🛡️ **Blue**: Advocate
- 🎓 **Green**: Student
- 📋 **Purple**: Clerk
- 👑 **Gold**: Premium

### Priority Indicators
- 🥇 **Gold**: #1, Premium
- 🥈 **Silver**: #2, Standard
- 🥉 **Bronze**: #3, Basic

---

## 📱 Responsive Behavior

### Mobile (< 640px)
```
┌──────────────┐
│ ☰  🔍  🔔 👤│ ← Navbar
├──────────────┤
│              │
│   Content    │ ← Full width
│   Single     │
│   Column     │
│              │
└──────────────┘
```

### Desktop (> 1024px)
```
┌───┬──────────────────────┐
│ S │  Navbar              │
│ I │──────────────────────│
│ D │                      │
│ E │   Multi-column       │
│ B │   Content            │
│ A │   Layout             │
│ R │                      │
└───┴──────────────────────┘
```

---

**🎨 Admin Panel Visual Guide v1.0**
