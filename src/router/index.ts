import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/OrgListView.vue'
import StudentView from '../views/StudentView.vue'
import MenuView from '../views/MenuView.vue'
import EventDetailView from '../views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import OrgLayoutView from "@/views/org/OrgLayoutView.vue";
import {useOrgStore} from "@/stores/org";
import OrgService from "@/services/OrgService";
import OrgDetailView from "@/views/org/OrgDetailView.vue";
import OrgEditView from "@/views/org/OrgEditView.vue";
import OrgRegisterView from "@/views/org/OrgRegisterView.vue";
import AddEventView from "@/views/EventFormView.vue";
import AddOrgView from "@/views/OrgFormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        size: parseInt((route.query?.size as string) || '2')
      })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1'),
        size: parseInt((route.query?.size as string) || '2')
      })
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id : number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEventById(id)
          .then((response) => {
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            }else{
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView,
          props: true
        }
      ]
    },
    {
      path: '/org/:id',
      name: 'org-layout',
      component: OrgLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id : number = parseInt(to.params.id as string)
        const OrgStore = useOrgStore()
        return OrgService.getOrgById(id)
            .then((response) => {
              OrgStore.setOrg(response.data)
            })
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                return {
                  name: '404-resource',
                  params: { resource: 'event' }
                }
              }else{
                return { name: 'network-error' }
              }
            })
      },
      children: [
        {
          path: '',
          name: 'org-detail',
          component: OrgDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'org-edit',
          component: OrgEditView,
          props: true
        },
        {
          path: 'register',
          name: 'org-register',
          component: OrgRegisterView,
          props: true
        }
      ]
    },
    {
      path: '/menu',
      name: 'Menu',
      component: MenuView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/add-org',
      name: 'add-org',
      component: AddOrgView

    },
    {
      path: '/student',
      name: 'Student',
      component: StudentView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    }
  ],
 scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    }else{
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
