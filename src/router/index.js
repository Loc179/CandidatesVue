import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/candidate'
    },
    {
      path: '/recruiment',
      name: 'Tin tuyển dụng',
      component: () => import('@/views/recruiment/RecruimentList.vue')
    },
    {
      path: '/candidate',
      name: 'Ứng viên',
      component: () => import('@/views/candidate/CandidateList.vue'),
    },
    {
      path: '/calender',
      name: 'Lịch',
      component: () => import('@/views/calender/CalenderList.vue'),
    },
    {
      path: '/talentpool',
      name: 'Kho tiềm năng',
      component: () => import('@/views/talentpool/TalentPool.vue'),
    },
    {
      path: '/recruimentCampaign',
      name: 'Chiến dịch tuyển dụng',
      component: () => import('@/views/recruiment-campaign/RecruimentCampaignList.vue'),
    },
    {
      path: '/task',
      name: 'Công việc',
      component: () => import('@/views/task/TaskList.vue'),
    },
    {
      path: '/aiMarketing',
      name: 'aiMarketing',
      component: () => import('@/views/ai-marketing/AiMarketing.vue'),
    },
    {
      path: '/chatbox',
      name: 'Trao đổi với ứng viên',
      component: () => import('@/views/chatbox/ChatBox.vue'),
    },
    {
      path: '/report',
      name: 'Báo cáo',
      component: () => import('@/views/report/ReportList.vue'),
    }
  ],
})

export default router
