# ISSUES
1. `<style jsx>{`...`}</style>` doesn't apply styles to Bootstrap elements.
- **Reason**: It only supports .jsx files (as implied on the syntax). For .js, use `<style js>` instead.
- **Alternative**: Utilize `<style jsx global>` as a hack/workaround to make this work (if you prefer using `<style jsx>`).
- **Caveat**: This method however, apply styles globally.
