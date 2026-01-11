import { getFormStats } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { Users, Clock, Calendar, BarChart3, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

async function DashboardPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const { success, data: form } = await getFormStats(formId);

  if (!success || !form) {
    return notFound();
  }

  const lastResponse = form.lastResponseAt
    ? formatDistanceToNow(new Date(form.lastResponseAt), { addSuffix: true })
    : "No responses yet";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Total response  */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{form.totalResponses}</div>
            <p className="text-xs text-muted-foreground">
              All time submissions
            </p>
          </CardContent>
        </Card>
        {/* Last response */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Last Response
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize text-nowrap truncate">{lastResponse}</div>
            <p className="text-xs text-muted-foreground">
              Most recent activity
            </p>
          </CardContent>
        </Card>
        {/* Published date  */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published Date
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nowrap truncate">
              {form.publishedAt ? new Date(form.publishedAt).toLocaleDateString() : "Not published"}
            </div>
            <p className="text-xs text-muted-foreground">
              Date form went live
            </p>
          </CardContent>
        </Card>
        {/* Analytics - Coming soon */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Analytics
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--%</div>
            <p className="text-xs text-muted-foreground">
              Conversion rate (Coming soon)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

        {/* Display recent responses */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Responses</CardTitle>
          </CardHeader>
          <CardContent>
            {form.responses && form.responses.length > 0 ? (
              <div className="space-y-4">
                {form.responses.map((response:any) => (
                  <div key={response.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Submission</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(response.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/${form.id}/response`}>View All Responses</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                <p>No responses yet</p>
                <p className="text-sm">Share your form to start collecting data</p>
              </div>
            )}
          </CardContent>
        </Card>

        
        {/*  Quick Actions  */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start">
              Copy Link
            </Button>
            <Button variant="outline" className="justify-start">
              View Public Form
            </Button>
            <Button variant="outline" className="justify-start text-destructive hover:bg-destructive/10">
              Pause Form
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;