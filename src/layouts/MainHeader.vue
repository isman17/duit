<script>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'

  export default {
      name: "MainHeader",
      data() {
        return {
          darkMode: true,
          links: [
            {
              name: 'home',
              icon: 'compare_arrows',
              label: 'Conversion',
              caption: 'Convert any value between currencies',
            },
            // {
            //   name: 'history',
            //   icon: 'youtube_searched_for',
            //   label: 'History',
            //   caption: 'Historical rates for any working day since 4 January 1999',
            // },
          ]
        }
      },
      setup () {
        const $q = useQuasar();
        $q.dark.set(true)
        
        return {
          dark: $q.dark,
          leftDrawerOpen: ref(false)
        }
      },
      watch: {
        darkMode() {
          this.dark.toggle()
        }
      },
  }
</script>

<template>
    <div>
      <q-header elevated>
        <q-toolbar>
          <!-- <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="r_menu"
          /> -->

          <q-toolbar-title>
            App
          </q-toolbar-title>

          <div>
            <q-toggle v-model="darkMode" 
              color="white"
              />
          </div>
        </q-toolbar>
      </q-header>

      <!-- <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        >
        <q-list>
          <q-item 
            v-for="link in links"
            :key="'header-link-' + link.name"
            clickable 
            :exact-active-class="$q.dark.isActive ? 'text-white bg-accent' : 'text-white bg-accent'" 
            :to="{ name: link.name }">
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-text="link.label"></q-item-label>
                <q-item-label caption v-text="link.caption"></q-item-label>
              </q-item-section>
          </q-item>

        </q-list>
      </q-drawer> -->
    </div>
</template>