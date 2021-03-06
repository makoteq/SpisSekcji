<template>
  <q-table
    :grid="isMobileDevice"
    :rows-per-page-options="[20, 50, 100, 150, 200, 250, 0]"
    :columns="columns"
    :loading="loading"
    :data="
      selectedCategories.length === 0
        ? deadgroups
        : deadgroups.filter(x => selectedCategories.includes(x.category))
    "
    :visible-columns="['Name', 'Link', 'Category']"
    :filter="input"
    :pagination.sync="pagination"
    flat
    dense
    square
    binary-state-sort
  >
    <template v-slot:top-left>
      <q-input
        v-model="input"
        color="secondary"
        placeholder="Wyszukiwarka sekcji"
        dense
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-select
        v-model="selectedCategories"
        :options="categories"
        color="secondary"
        multiple
        dense
        options-dense
        label="Pokaż kategorie"
        options-selected-class="text-secondary"
      />
      <div class="q-mt-xs" />
      <span>Autorzy: Grzegorz Perun & Daniel Nguyen</span>
      <div v-if="deadgroups.length !== 0">
        <span>Ostatnia aktualizacja: {{ lastUpdateDate }}</span>
      </div>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="Name" :props="props">
          <span>{{ props.row.name }}</span>
        </q-td>
        <q-td key="Link" :props="props">
          <a :href="props.row.link" class="text-secondary" target="_blank">
            {{ props.row.link.replace('https://facebook.com/groups', '') }}
          </a>
        </q-td>
        <q-td key="Category" :props="props">
          <span>{{ props.row.category }}</span>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:item="props">
      <div class="col-12">
        <q-card :props="props" flat class="q-pb-md">
          <q-list dense>
            <q-item>
              <q-item-section>
                <q-item-label caption>{{ props.cols[0].label }}</q-item-label>
                <q-item-label>{{ props.cols[0].value }}</q-item-label>
                <q-item-label caption>{{ props.cols[1].label }}</q-item-label>
                <q-item-label>
                  <a
                    :href="props.cols[1].value"
                    class="text-secondary"
                    target="_blank"
                  >
                    {{
                      props.cols[1].value.replace(
                        'https://facebook.com/groups',
                        ''
                      )
                    }}
                  </a></q-item-label
                >
                <q-item-label caption>{{ props.cols[2].label }}</q-item-label>
                <q-item-label>{{ props.cols[2].value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script>
import common from '~/mixins/common.js'
export default {
  layout: 'layout',
  mixins: [common],
  data() {
    return {
      deadgroups: [],
      categories: [],
      selectedCategories: [],
      pagination: {
        sortBy: 'Name',
        descending: false
      }
    }
  },
  mounted() {
    fetch('https://spissekcji.firebaseio.com/deadgroups.json')
      .then(response => response.json())
      .then(output => {
        this.deadgroups = [...output.deadgroups]
        this.lastUpdateDate = output.lastUpdateDate
      })
      .then(
        callback =>
          (this.categories = [
            ...new Set(this.deadgroups.map(x => x.category).sort())
          ])
      )
      .then(callback => (this.loading = false))
  }
}
</script>
