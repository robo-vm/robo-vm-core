# Superset Dashboard Installation Guide

## Prerequisites

1. Apache Superset installed and running
2. MySQL/PostgreSQL database configured
3. Database connection added to Superset

## Step 1: Create Database Tables

Execute the SQL script to create tables and populate with sample data:

```bash
mysql -u your_user -p your_database < mock_data.sql
```

Or for PostgreSQL:

```bash
psql -U your_user -d your_database -f mock_data.sql
```

## Step 2: Import Dashboard

1. Open Superset UI
2. Go to **Dashboards** → **Import Dashboard**
3. Upload `dashboard_export.json`
4. Configure database connections if needed

## Step 3: Apply Theme

1. Go to **Settings** → **CSS Templates**
2. Create a new CSS template named "RoboVM Dark"
3. Copy contents from `superset_theme.css`
4. Apply to the dashboard

Alternatively, add to `superset_config.py`:

```python
CUSTOM_THEME = {
    "ROBOVM_DARK": {
        "background": "#0b1e3e",
        "primary": "#d2618f",
        "text": "#ffffff",
        "textSecondary": "#b0c4de",
        "border": "#1a2f4f"
    }
}
```

## Step 4: Create Charts

For each chart in the dashboard:

1. Go to **Charts** → **Add Chart**
2. Select the appropriate datasource
3. Choose visualization type
4. Use the SQL queries from `queries/` folder
5. Configure chart settings
6. Save and add to dashboard

## Step 5: Configure Dashboard Layout

1. Edit dashboard
2. Arrange charts using drag-and-drop
3. Resize charts as needed
4. Apply filters and time ranges
5. Save dashboard

## Customization

### Colors

- Background: `#0b1e3e`
- Accent: `#d2618f`
- Text: `#ffffff`
- Secondary Text: `#b0c4de`

### Chart Types

The dashboard includes:
- Big Number metrics
- Line charts
- Bar charts
- Pie charts
- Tables
- Heatmaps
- Geographic visualizations
- Area charts
- Histograms

## Troubleshooting

### Database Connection Issues

Ensure database credentials are correct in Superset settings.

### Missing Data

Re-run `mock_data.sql` to refresh data.

### Theme Not Applied

Clear browser cache and reload dashboard.

## Next Steps

- Connect to real data sources
- Customize queries for your use case
- Add additional metrics
- Configure alerts and notifications

