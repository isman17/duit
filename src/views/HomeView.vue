<template>
  <div id="home" class="q-pa-md">
    <div id="latest" class="row justify-center">
      <q-card class="col-12 col-md-4 q-ma-sm">
        <q-card-section style="height: 100%;">
          <div class="row justify-between">
            <span v-text="latest.amount + ' ' + latest.base"></span>
            <span v-text="latestDate"></span>
          </div>
          <q-separator class="q-mt-sm" dark />
          <div class="row items-center justify-center" style="height: 90%">
            <h2 class="text-center text-bold" v-text="latestRate + ' ' + latestRateCurrency"></h2>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-7 q-ma-sm">
        <q-card-section>
          <q-input outlined v-model="amount" label="Amount" />
          <q-select clearable outlined color="white" v-model="from" :options="options" label="From" class="q-mt-md">
            <template v-slot:prepend>
              <q-icon name="price_change" />
            </template>
          </q-select>
          <q-select clearable outlined color="white" v-model="to" :options="options" label="To" class="q-mt-md">
            <template v-slot:prepend>
              <q-icon name="price_change" />
            </template>
          </q-select>
          <div class="row items-center justify-center q-pt-md">
            <q-btn color="positive" icon-right="currency_exchange" label="Conversion" @click="getLatest" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { Notify } from 'quasar'

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      myNotify: () => void 0,
      latest: {
        amount: 1,
        base: 'USD',
        date: '2022-07-20',
        rates: {
          IDR: 14978,
        },
      },
      amount: 1,
      from: {
        label: '',
        value: ''
      },
      to: {
        label: '',
        value: ''
      },
      // options: [
      //     'USD',
      //     'IDR',
      // ],
      options: [
        {
          label: 'United States Dollar',
          value: 'USD'
        },
        {
          label: 'Indonesian Rupiah',
          value: 'IDR'
        },
      ]
    }
  },
  mounted() {
    this.getCurrencies()
    // this.getLatest()
  },
  methods: {
    notify(type, message) {
      this.myNotify()
      this.myNotify = Notify.create({
          type: type,
          message: message,
      })
    },
    getLatest() {
      this.myNotify()
      this.notify('ongoing', 'Please wait')
      let url = this.baseUrl + '/latest?from='+ this.from.value + '&to=' + this.to.value + '&amount=' + this.amount
      fetch(url)
        .then((res) => {
          if(res.status != 200) {
            console.log(res.status)
            this.myNotify()
            this.notify('negative', 'Error happened!')
          }

          return res.json()
        })
        .then((body) => {
          this.latest = body
          this.myNotify()
          this.notify('positive', 'Conversion success')
        })
        .catch((error) => {
          console.log(error)
          this.myNotify()
          this.notify('negative', 'Error happened!')
        })
    },
    getCurrencies() {
      let url = this.baseUrl + '/currencies'
      fetch(url)
        .then((res) => {
          if(res.status != 200) {
            console.log(res.status)
            this.myNotify()
            this.notify('negative', 'Error happened!')
          }

          return res.json()
        })
        .then((body) => {
          const options = Object.entries(body).map(function(current) {
            let formatted = {
              value: current[0],
              label: current[1],
            }
            return formatted
          })
          this.options = options
          // this.optionValue = Object.keys(body)
          // this.optionLabel = Object.values(body)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    latestDate() {
      const timeStamp = Date(this.latest.date)
      const formattedDate = date.formatDate(timeStamp, 'DD MMMM YYYY')
      return formattedDate
    },
    latestRate() {
      return Object.values(this.latest.rates).join().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    latestRateCurrency() {
      return Object.keys(this.latest.rates).join()
    }
  },
  watch: {
    from() {
      let from = this.from.value
      let all = []
      this.options.forEach((option) => {
        option['disable'] = false
        all.push(option)
      })
      const selectedOption = all.filter(function(item) {
        return item.value == from
      })
      selectedOption[0]['disable'] = true
    },
    to() {
      let to = this.to.value
      let all = []
      this.options.forEach((option) => {
        option['disable'] = false
        all.push(option)
      })
      const selectedOption = all.filter(function(item) {
        return item.value == to
      })
      selectedOption[0]['disable'] = true
    }
  }
}
</script>
