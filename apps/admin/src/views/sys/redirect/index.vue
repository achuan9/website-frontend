<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  const { params, query } = route;
  const { path } = params;
  
  const _path = Array.isArray(path) ? path.join('/') : path;
  
  router.replace({
    path: '/' + _path,
    query,
  });
});
</script> 